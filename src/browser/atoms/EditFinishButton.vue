<template lang="pug">
  v-btn(color="primary" @click="$nextTick(() => $emit('click', $event))") 編集終了
</template>
