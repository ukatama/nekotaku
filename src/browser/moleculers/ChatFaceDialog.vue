<template lang="pug">
  bottom-dialog(:value="value" @input="$emit('input', $event)")
    chat-face-select(:faces="faces" :value="face" @input="onInput")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BottomDialog from '@/browser/moleculers/BottomDialog.vue';
import ChatFaceSelect from '@/browser/atoms/ChatFaceSelect.vue';

interface Portrait {
  [key: string]: {
    url?: string | null;
  };
}

@Component({
  components: {
    BottomDialog,
    ChatFaceSelect,
  },
})
export default class ChatFaceDialog extends Vue {
  @Prop({ required: true }) private value!: boolean;
  @Prop({ required: true }) private characters!: { name: string, portrait?: Portrait }[]; // ToDo

  get faces(): string[] {
    const {
      characters,
      name,
    } = this;

    const character = characters.find(c => c.name === name);
    if (!character) return [];

    const { portrait } = character;
    if (!portrait) return [];

    return Object.keys(portrait)
      .filter(key => portrait[key].url);
  }

  private get face(): string {
    return this.$store.getters.chatConfig.face || 'default';
  }

  private get name(): string {
    return this.$store.getters.chatConfig.name;
  }

  private onInput(face: string): void {
    this.$store.dispatch('updateChatFace', face);
  }
}
</script>
