<template lang="pug">
  v-tooltip
    v-btn(
      fab
      color="primary"
      slot="activator"
      @click="$emit('click', $event)"
    )
      v-icon add
    span 追加
</template>
