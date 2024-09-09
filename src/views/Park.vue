<template>
  <div class="about">
    <h1>Парк по координатам:</h1>
    <div>{{ $route.params.lnglat }}</div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
