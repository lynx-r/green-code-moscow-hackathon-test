<script setup lang="ts">
import { CITY_MASCULINE } from '@/constants'
import emptyItems from '@/factories/emptyItems'
import $http from '@/http'
import type Response from '@/types/Response'
import { load } from '@2gis/mapgl'
// or const { load } = require('@2gis/mapgl');

load().then(async (mapgl) => {
  const {
    data: { result: resultCity = emptyItems() }
  } = await $http.get<Response>('/items/geocode', {
    params: {
      q: CITY_MASCULINE,
      fields: 'items.point'
    }
  })

  if (!resultCity.items.length) {
    console.log(`City ${CITY_MASCULINE} not found`)
    return
  }
  const [city] = resultCity.items
  const { id: cityId, point: cityPoint } = city

  const map = new mapgl.Map('container', {
    center: [cityPoint.lon, cityPoint.lat],
    zoom: 9.5,
    key: '429c7eaa-c779-41f0-be1e-6897fe901500'
  })

  const marker = new mapgl.Marker(map, {
    coordinates: [55.31878, 25.23584]
  })

  const {
    data: { result: resultMasculine = emptyItems() }
  } = await $http.get<Response>('/items', {
    params: {
      q: 'заповедник',
      city_id: cityId,
      fields: 'items.point'
    }
  })

  if (!resultMasculine.items.length) {
    console.log('No masculine were found')
    return
  }
  resultMasculine.items.forEach((mas) => {
    const { point, name } = mas
    const coordinates = [point.lon, point.lat]
    new mapgl.Marker(map, {
      coordinates,
      label: {
        text: name
      }
    })
  })
  console.log(resultMasculine)
})
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->

    <div id="container"></div>
  </main>
</template>

<style scoped lang="css">
#container {
  width: 500px;
  height: 300px;
}
</style>
