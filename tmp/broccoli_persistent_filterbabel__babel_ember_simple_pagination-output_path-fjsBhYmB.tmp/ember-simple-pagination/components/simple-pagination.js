define('ember-simple-pagination/components/simple-pagination', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    maxPagesInList: 10,
    displayPaginator: _ember['default'].computed.gt('totalPages', 1),
    isPrevDisabled: _ember['default'].computed.equal('pageNumber', 1),
    attributeBindings: ['dataTestSelector:data-test-selector'],
    dataTestSelector: null,

    isNextDisabled: _ember['default'].computed('pageNumber', 'totalPages', function () {
      return this.get('pageNumber') === this.get('totalPages') ? true : false;
    }),

    prevPageNumber: _ember['default'].computed('pageNumber', function () {
      return Math.max(1, this.get('pageNumber') - 1);
    }),

    nextPageNumber: _ember['default'].computed('pageNumber', function () {
      return Math.min(this.get('totalPages'), this.get('pageNumber') + 1);
    }),

    totalPages: _ember['default'].computed('recordCount', 'pageSize', function () {
      var recordCount = this.get('recordCount'),
          pageSize = this.get('pageSize'),
          pageNumber = this.get('pageNumber'),
          maxPagesInList = this.get('maxPagesInList');

      if (recordCount < 0 || pageSize < 1 || pageNumber < 1 || maxPagesInList < 2) {
        return 0;
      }

      var totalPages = Math.floor(recordCount / pageSize),
          rem = recordCount % pageSize;

      if (rem > 0) {
        totalPages++;
      }

      return totalPages;
    }),

    nbrPagesInList: _ember['default'].computed('recordCount', 'pageSize', 'maxPagesInList', function () {
      return Math.min(this.get('totalPages'), this.get('maxPagesInList'));
    }),

    pages: _ember['default'].computed('pageNumber', 'recordCount', 'pageSize', 'maxPagesInList', function () {
      var pageArray = [],
          totalPages = this.get('totalPages'),
          pageNumber = this.get('pageNumber'),
          nbrPagesInList = this.get('nbrPagesInList'),
          active = undefined,
          pgNbr = undefined,
          endPgNbr = undefined;

      endPgNbr = Math.min(pageNumber + 3, totalPages);
      pgNbr = Math.max(endPgNbr - nbrPagesInList + 1, 1);

      for (var i = 0; i < nbrPagesInList; i++) {
        active = pgNbr === pageNumber ? true : false;
        pageArray[i] = { number: pgNbr, active: active };
        pgNbr++;
      }
      return pageArray;
    }),

    actions: {
      getPage: function getPage(newPageNumber) {
        if (newPageNumber !== this.get('pageNumber')) {
          this.get('onPageSelect')(newPageNumber);
        }
      }
    }
  });
});