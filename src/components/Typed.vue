<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: null
  },
  speed: {
    type: Number,
    default: 40
  }
})
const emit = defineEmits(['onEveryCharTyped', 'onEnd', 'onStart'])
const typed = ref('')
onMounted(() => {
  if (props.text) typeString(props.text)
})

function typeString (str) {
  emit('onStart')
  typing(str, 0)
}

function typing (string, pos) {
  if (pos >= string.length) {
    emit('onEnd')
    return
  }

  if (string[pos] === '<' || string[pos] === '&') {
    writeHtml(string, pos)
  } else {
    setTimeout(() => {
      writeChar(string, pos)
    }, props.speed)
  }
}

function writeChar (string, pos) {
  typed.value += string[pos]
  emit('onEveryCharTyped')
  typing(string, pos + 1)
}

function writeHtml(string, pos) {
  const endTag = string[pos] === '<' ? '>' : ';'
  while (string[pos] !== endTag) {
    typed.value += string[pos++]
  }
  typing(string, pos)
}


</script>

<template>
  <span v-html="typed"></span>
</template>

<style scoped>
</style>