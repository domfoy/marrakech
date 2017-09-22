const assert = require('assert');

const _ = require('lodash');

const {BOARD_SIDE_SIZE} = require('../../../models/Consts.js');

module.exports = {
  computeColoursDomains,
  computeFreeRugSpots
};

function computeColoursDomains(layer) {
  assert(layer && layer.length === BOARD_SIDE_SIZE * BOARD_SIDE_SIZE, 'No valid layer.');

  const reorderedLayer = _.concat([], ..._(layer).chunk(BOARD_SIDE_SIZE).reverse().value());

  const rawColoursDomains = _.reduce(reorderedLayer,
    (cur, cell, i) => {
      if (cell === 0) {
        return cur;
      }

      if (!cur[cell]) {
        cur[cell] = [];
      }

      const sameColourDomains = cur[cell];

      const neighbouringDomainsIndexes = findNeighbouringDomainsIndexes(i, sameColourDomains);

      if (neighbouringDomainsIndexes.length === 0) {
        cur[cell].push({
          cells: [i]
        });

        return cur;
      }

      const neighbouringDomainToWidenIndex = _.min(neighbouringDomainsIndexes);

      cur[cell][neighbouringDomainToWidenIndex].size++;
      cur[cell][neighbouringDomainToWidenIndex].cells.push(i);

      const neighbouringDomainsToDeleteIndexes = _.filter(neighbouringDomainsIndexes,
        index => index !== neighbouringDomainToWidenIndex
      );

      if (neighbouringDomainsToDeleteIndexes.length === 0) {
        return cur;
      }

      _.forEach(neighbouringDomainsToDeleteIndexes, (index) => {
        cur[cell][neighbouringDomainToWidenIndex].size += cur[cell][index].size;
        cur[cell][neighbouringDomainToWidenIndex].cells.splice(-1, 0,
          ...cur[cell][index].cells
        );

        cur[cell][neighbouringDomainToWidenIndex].cells.sort((a, b) => a - b);
      });

      _.forEach(neighbouringDomainsToDeleteIndexes, (index) => {
        cur[cell].splice(index, 1);
      });


      return cur;
    },
    {}
  );

  return _.map(rawColoursDomains,
    (domains, colourId) => ({
      colourId: parseInt(colourId, 10),
      domains: _.map(domains, d => d.cells)
    })
  );
}

function findNeighbouringDomainsIndexes(position, domains) {
  const positionsToCheck = _.filter([
    position + 1,
    position - BOARD_SIDE_SIZE,
    position - 1,
    position + BOARD_SIDE_SIZE,
  ], p => p >= 0);

  const rawNeighbouringDomainsIndexes = _.map(positionsToCheck,
    (positionToCheck) => {
      return _(domains)
        .map((domain, domainIndex) => {
          return domain.cells && domain.cells.includes(positionToCheck) && domainIndex;
        })
        .filter(index => _.isNumber(index))
        .value();
    });

  const neighbouringDomainsIndexes = _.uniq(_.concat([], ...rawNeighbouringDomainsIndexes));

  return neighbouringDomainsIndexes;
}

function computeFreeRugSpots(game) {
  const {board: {uncoveredRugs}, assam: {position}} = game;

  const orientationVectors = [
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1}
  ];

  const bases = orientationVectors.map((vector, index, vectors) => {
    return {u: vector, v: vectors[(index + 1) % 4]};
  });

  const deepSpots = bases
    .filter((base) => {
      const centralPosition = {
        x: position.x + base.u.x,
        y: position.y + base.u.y
      };

      return !isPositionOutside(centralPosition);
    })
    .map((base) => {
      const centralPosition = {
        x: position.x + base.u.x,
        y: position.y + base.u.y
      };

      const extremities = [
        {
          x: position.x - base.v.x,
          y: position.y - base.v.y
        },
        {
          x: position.x + (2 * base.u.x),
          y: position.y + (2 * base.u.y)
        },
        {
          x: position.x + base.v.x,
          y: position.y + base.v.y
        }
      ];

      const centralPositionRugId = coveringRugId(uncoveredRugs, centralPosition);

      return extremities
        .filter((extremity) => {
          const extremityRugId = coveringRugId(uncoveredRugs, extremity);
          const isSameRug = extremityRugId === centralPositionRugId;
          const hasBotheringRug = centralPositionRugId >= 0 && isSameRug;

          return !(isPositionOutside(extremity) || hasBotheringRug);
        })
        .map(extremity => convertToSpot(centralPosition, extremity));
    });

  return _.flatten(deepSpots);
}

function coveringRugId(uncoveredRugs, position) {
  const cell = convertToCell(position);
  return _.findIndex(uncoveredRugs, (uncoveredRug) => {
    return (uncoveredRug.cell1 === cell)
        || (uncoveredRug.cell2 === cell);
  });
}

function isPositionOutside(x, y) {
  const tooLeft = x < 0;
  const tooRight = x >= BOARD_SIDE_SIZE;
  const tooLow = y < 0;
  const tooHigh = y >= BOARD_SIDE_SIZE;

  return tooLeft
    || tooRight
    || tooLow
    || tooHigh;
}

function convertToSpot(position1, position2) {
  return _.sort(convertToCell(position1), convertToCell(position2));
}

function convertToCell(position) {
  return (position.y * BOARD_SIDE_SIZE) + position.x;
}
