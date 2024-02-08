<template>
  <v-card :width="width" :style="`margin: ${margin}px;`">
    <v-card-title style="font-weight: bold;">{{ title }}</v-card-title>
    <v-list lines="two">
      <v-list-item v-for="[t, s] of data" :key="t + s" :title="t" :subtitle="s"></v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ["width", "margin", "title", "data"]
}
</script>
