'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contactCtrlStub = {
  index: 'contactCtrl.index',
  show: 'contactCtrl.show',
  create: 'contactCtrl.create',
  update: 'contactCtrl.update',
  destroy: 'contactCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contactIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contact.controller': contactCtrlStub
});

describe('Contact API Router:', function() {

  it('should return an express router instance', function() {
    expect(contactIndex).to.equal(routerStub);
  });

  describe('GET /api/contact', function() {

    it('should route to contact.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'contactCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/contact/:id', function() {

    it('should route to contact.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'contactCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/contact', function() {

    it('should route to contact.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'contactCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/contact/:id', function() {

    it('should route to contact.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'contactCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/contact/:id', function() {

    it('should route to contact.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'contactCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contact/:id', function() {

    it('should route to contact.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'contactCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
