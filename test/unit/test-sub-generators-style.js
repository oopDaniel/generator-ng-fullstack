import {expect} from 'chai';
import sinon from 'sinon';
import knownPaths from '../../_ng/utils/known_paths';

import {StyleSubGenerator} from '../../_ng/client/sub_generators_style';

describe('StyleSubGenerator', () => {
  describe('creation', () => {
    it('should have the right param passed to wrapper', () => {
      let _gen = {
        a: true,
        config: {
          get() {
            return 'ng1'
          }
        }
      };
      let _dsg = new StyleSubGenerator(_gen);

      expect(_dsg.wrapper).to.equal(_gen);
    });
  });

  describe('initializing', () => {
    it('should have the initializing called with the right stuff', () => {
      let _gen = {
        argument: () => {},
        config: {
          get() {
            return 'ng1'
          }
        }
      };

      sinon.mock(_gen.argument);

      let _dsg = new StyleSubGenerator(_gen);

      _dsg.initializing();

      expect(_dsg.wrapper.argument).to.have.been.called;
    });
  });

  describe('writing', () => {
    describe('ng1', () => {
      it('should have the writing called with the right stuff', () => {
        let _gen = {
          name: 'a',
          options: {feature: 'c'},
          config: {
            get() {
              return 'ng1';
            }
          },
          template: sinon.spy()
        };

        let _dsg = new StyleSubGenerator(_gen);

        _dsg.writing();

        let _firstCall = ['style.css', knownPaths.PATH_CLIENT_FEATURES + _gen.options.feature + '/styles/' + _gen.name + '.css'];

        expect(_dsg.wrapper.writing).to.have.been.called;
        expect(_dsg.wrapper.template.calledWith(_firstCall[0], _firstCall[1])).to.be.true;
      });
    })

    describe('ng2', () => {
      it('should have the writing called with the right stuff', () => {
        let _gen = {
          name: 'a',
          options: {feature: 'c'},
          config: {
            get() {
              return 'ng2';
            }
          },
          template: sinon.spy()
        };

        let _dsg = new StyleSubGenerator(_gen);

        _dsg.writing();

        let _firstCall = ['style.css', knownPaths.PATH_CLIENT_FEATURES + _gen.options.feature + '/styles/' + _gen.name + '.css'];

        expect(_dsg.wrapper.writing).to.have.been.called;
        expect(_dsg.wrapper.template.calledWith(_firstCall[0], _firstCall[1])).to.be.true;
      });
    })
  });
});
