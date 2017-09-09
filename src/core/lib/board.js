const assert = require('assert');

const _ = require('lodash');

const BOARD_LENGTH = 7;

module.exports = {
  computePlayersDomains
};

function computePlayersDomains(layer) {
  assert(layer && layer.length === BOARD_LENGTH * BOARD_LENGTH, 'No valid layer.');

  const reorderedLayer = _.concat([], ..._(layer).chunk(BOARD_LENGTH).reverse().value());

  return _.reduce(reorderedLayer,
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
          size: 1,
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
}

function findNeighbouringDomainsIndexes(position, domains) {
  const positionsToCheck = _.filter([
    position + 1,
    position - BOARD_LENGTH,
    position - 1,
    position + BOARD_LENGTH,
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
