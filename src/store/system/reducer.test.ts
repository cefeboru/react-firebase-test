import { SAVE_USER_DATA } from './types';
import { initialState, SystemState } from './state';
import { saveUserData } from './actions';
import { systemRecuder } from './reducer';
import { Action } from 'redux-actions';

describe('System reducer', () => {
  describe(`[${SAVE_USER_DATA}]`, () => {
    let fakeUser: Partial<firebase.UserInfo>;
    let saveUserDataAction: Action<firebase.UserInfo>;
    let state: SystemState;

    beforeAll(() => {
      fakeUser = {
        displayName: 'fakeUserName',
      };
    });

    beforeEach(() => {
      saveUserDataAction = saveUserData(fakeUser as firebase.User);
      state = systemRecuder(initialState, saveUserDataAction);
    });

    it('Should set the loggenIn flag', () => {
      expect(state).toHaveProperty('loggedIn', true);
    });

    it('Should save the user information', () => {
      expect(state).toHaveProperty('user.displayName', fakeUser.displayName);
    });
  });
});