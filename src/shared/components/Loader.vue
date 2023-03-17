<template>
  <div :class="$style.loader__container">
    <div :class="$style['lds-ellipsis']">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<style module src="./Loader.module.css" />
