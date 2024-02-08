<template>
  <div :style="`margin: ${margin}px;`">
    <div style="font-weight: bold; font-size: 1.2rem;">{{ title }}</div>
    <iframe :src="`https://maps.google.com/maps?q=${lat},${lng}&amp;output=embed`" :width="width" :height="height"
      :frameborder="frameborder" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
</template>

<script>
export default {
  props: ["title", "width", "height", "margin", "frameborder", "lat", "lng"]
}
</script>
