<script setup>
import { nextTick } from "vue";
import watermark from "../utils/watermark";
nextTick(() => {
  if (typeof window !== "undefined") {
    window.document.querySelector("body .vp-doc") &&
      watermark.set(
        "锅头的家 sddrgt.online 个人笔记",
        window.document.querySelector("body .vp-doc")
      );
  }
});
</script>
<template></template>
