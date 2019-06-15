import { SAVE_USER_DATA, CLEAN_USER_DATA, UPDATE_SIGN_IN_ERROR } from './types';
import { systemInitialState, SystemState } from './state';
import { saveUserData, cleanUserData, updateSignInError } from './actions';
import { systemRecuder } from './reducer';

describe('System reducer', () => {
  let state: SystemState;
  let fakeUser: Partial<firebase.UserInfo>;
  afterEach(() => {
    state = systemInitialState;
  });
  describe(SAVE_USER_DATA, () => {
    let saveUserDataAction: ReturnType<typeof saveUserData>;
    beforeAll(() => {
      fakeUser = {
        displayName: 'fakeUserName',
      };
    });

    beforeEach(() => {
      saveUserDataAction = saveUserData(fakeUser as firebase.User);
      state = systemRecuder(systemInitialState, saveUserDataAction);
    });

    it('Should set the loggegIn flag to true', () => {
      expect(state).toHaveProperty('loggedIn', true);
    });

    it('Should save the user information', () => {
      expect(state).toHaveProperty('user.displayName', fakeUser.displayName);
    });
  });

  describe(CLEAN_USER_DATA, () => {
    let cleanUserDataAction = cleanUserData();
    beforeAll(() => {
      cleanUserDataAction = cleanUserData();
    });
    beforeEach(() => {
      state = {
        ...systemInitialState,
        loggedIn: true,
        user: fakeUser as firebase.UserInfo,
      };
      state = systemRecuder(state, cleanUserDataAction);
    });
    it('Should set the loggedIn flag to false', () => {
      expect(state).toHaveProperty('loggedIn', false);
    });

    it('Should clean the user object', () => {
      expect(state).toHaveProperty('user', undefined);
    });
  });
  describe(UPDATE_SIGN_IN_ERROR, () => {
    let fakeError: firebase.FirebaseError;
    let updateLogInErrorAction: ReturnType<typeof updateSignInError>;

    beforeAll(() => {
      fakeError = {
        code: 'code',
        message: 'someMesage',
        name: 'errorName',
        stack: 'fakeStack',
      };
      updateLogInErrorAction = updateSignInError(fakeError);
    });

    it('Should update the error', () => {
      state = systemRecuder(state, updateLogInErrorAction);
      expect(state).toHaveProperty('logInError', fakeError);
    });
  });
});