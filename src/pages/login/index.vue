<template>
  <div class="pages_login">
    login
    {{title}}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(['title'])
  }
}
</script>