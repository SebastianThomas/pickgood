<script setup lang="ts">
import { Head } from '@vueuse/head'

defineProps<{ title: string }>()
</script>

<template>

  <Head>
    <title>PickGood: {{ title }}</title>
  </Head>
</template>
