import {expect} from 'chai';
import sinon from 'sinon';
import knownPaths from '../../_ng/utils/known_paths';

import {ModelSubGenerator} from '../../_ng/client/sub_generators_model';

describe('ModelSubGenerator', () => {
  describe('creation', () => {
    it('should have the right param passed to wrapper', () => {
      let _gen = {
        a: true,
        config: {
          get(){return 'ng1'}
        }
      };
      let _ssg = new ModelSubGenerator(_gen);

      expect(_ssg.wrapper).to.equal(_gen);
    });
  });

  describe('initializing', () => {
    it('should have the initializing called with the right stuff', () => {
      let _gen = {
        argument(){},
        config: {
          get(){return 'ng1'}
        }
      };

      sinon.mock(_gen.argument);

      let _ssg = new ModelSubGenerator(_gen);

      _ssg.initializing();

      expect(_ssg.wrapper.argument).to.have.been.called;
    });
  });

  describe('writing', () => {
    describe('ng1', () => {
      it('should have the writing called with the right stuff', () => {
        let _gen = {
          name: 'a',
          options: {feature: 'c'},
          template: sinon.spy(),
          config: {
            get(){return 'ng1'}
          }
        };

        let _ssg = new ModelSubGenerator(_gen);

        let _firstCall = ['ng1/model.js', knownPaths.PATH_CLIENT_FEATURES + _gen.options.feature + '/models/' + _gen.name + '.js', {name: _gen.name}]
        let _secondCall = ['ng1/model_test.js', knownPaths.PATH_CLIENT_FEATURES_TEST + _gen.options.feature + '/models/' + _gen.name + '_test.js', {name: _gen.name}]

        _ssg.writing();

        expect(_ssg.wrapper.writing).to.have.been.called;
        expect(_ssg.wrapper.template.calledWith(_firstCall[0], _firstCall[1], _firstCall[2])).to.be.true;
        expect(_ssg.wrapper.template.calledWith(_secondCall[0], _secondCall[1], _secondCall[2])).to.be.true;
      });
    })

    describe('ng2', () => {
      it('should have the writing called with the right stuff', () => {
        let _gen = {
          name: 'a',
          options: {feature: 'c'},
          template: sinon.spy(),
          config: {
            get(){return 'ng2'}
          }
        };

        let _ssg = new ModelSubGenerator(_gen);

        let _firstCall = ['ng2/model.ts', knownPaths.PATH_CLIENT_FEATURES + _gen.options.feature + '/models/' + _gen.name + '.ts', {name: _gen.name}]
        let _secondCall = ['ng2/model_test.ts', knownPaths.PATH_CLIENT_FEATURES_TEST + _gen.options.feature + '/models/' + _gen.name + '_test.ts', {name: _gen.name}]

        _ssg.writing();

        expect(_ssg.wrapper.writing).to.have.been.called;
        expect(_ssg.wrapper.template.calledWith(_firstCall[0], _firstCall[1], _firstCall[2])).to.be.true;
        expect(_ssg.wrapper.template.calledWith(_secondCall[0], _secondCall[1], _secondCall[2])).to.be.true;
      });
    })
  });
});
