<script setup lang="ts">
import $http from '@/http'
import { load } from '@2gis/mapgl'
// or const { load } = require('@2gis/mapgl');

load().then(async (mapglAPI) => {
  const map = new mapglAPI.Map('container', {
    center: [55.31878, 25.23584],
    zoom: 4,
    key: '429c7eaa-c779-41f0-be1e-6897fe901500'
  })

  const marker = new mapglAPI.Marker(map, {
    coordinates: [55.31878, 25.23584]
  })

  const moscowRes = await $http.get('/items', {
    params: {
      q: 'Москва'
    }
  })

  console.log(moscowRes)

  // $http.get('/items', {
  //   params: {
  //     q: 'Москва заповедник'б
  //     city_id: moscowId
  //   }
  // })
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
