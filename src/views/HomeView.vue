<script setup lang="ts">
import type { YMap } from '@yandex/ymaps3-types'
import { shallowRef } from 'vue'
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps'

//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null)
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <YandexMap
      v-model="map"
      :settings="{
        location: {
          center: [37.617644, 55.755819],
          zoom: 9
        }
      }"
      width="100%"
      height="500px"
    >
      <YandexMapDefaultSchemeLayer />
    </YandexMap>
  </main>
</template>
