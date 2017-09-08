import backend from '../backend';
import * as RouteNames from '../constants/route';
import listStore from './listStore';

export default {
  ...listStore('rooms', true),
  actions: {
    async joinLobby({ commit }) {
      commit('rooms:clear');
      await backend.joinLobby((event, value) => commit(event, value));
    },
    async leaveLobby() {
      await backend.leaveLobby();
    },
    async createRoom(
      store,
      {
        title,
        dice,
        characterAttributes,
        router,
      },
    ) {
      const id = await backend.createRoom(title, dice, characterAttributes);
      router.push({ name: RouteNames.Room, params: { id } });
    },
  },
};