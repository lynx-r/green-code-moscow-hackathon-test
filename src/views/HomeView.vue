<script setup lang="ts">
import { LOCATION, PARKS_SEARCH_LIMIT, PARKS_SEARCH_TEXT } from '@/constants'
import { emptyPoint } from '@/factories/empty'
import type { Feature, YMap, YMapMarkerProps } from '@yandex/ymaps3-types'
import type { YMapDefaultMarkerProps } from '@yandex/ymaps3-types/packages/markers'
import { ref, shallowRef, watch } from 'vue'
import {
  VueYandexMaps,
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer
} from 'vue-yandex-maps'

//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null)

const selectedParkRef = ref<Feature>()

const handleClick = (park: Feature) => {
  selectedParkRef.value = park
}
let location = LOCATION
let parkMarkers = ref<YMapMarkerProps[]>([])

watch(VueYandexMaps.isLoaded, async () => {
  const parks = await ymaps3.search({
    text: PARKS_SEARCH_TEXT,
    limit: PARKS_SEARCH_LIMIT,
    type: ['businesses']
  })
  if (parks.length) {
    location.center = parks[0].geometry?.coordinates || [0, 0]
  }
  parkMarkers.value = parks.map((park): YMapDefaultMarkerProps => {
    const { geometry = emptyPoint(), properties } = park
    return {
      coordinates: geometry.coordinates,
      title: properties.name,
      subtitle: properties.description,
      onClick: () => handleClick(park)
    }
  })
})
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
      width="50vw"
      height="500px"
    >
      <YandexMapDefaultSchemeLayer :settings="{ theme: 'dark' }" />
      <YandexMapDefaultFeaturesLayer />
      <YandexMapDefaultMarker
        v-for="(marker, index) in parkMarkers"
        :key="index"
        :settings="marker"
      >
        <div class="marker" />
      </YandexMapDefaultMarker>
    </YandexMap>

    <article>
      <template v-if="selectedParkRef">
        <h4>Вы выбрали просмотр животных в парке {{ selectedParkRef.properties.name }}</h4>
        <a :href="`park/${selectedParkRef.geometry?.coordinates}`"> Страница парка</a>
      </template>
      <template v-else>
        <div>Выберите парк</div>
      </template>
    </article>
  </main>
</template>

<style scoped>
.marker {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;
}

main {
  display: flex;
  gap: 24px;
}
</style>
