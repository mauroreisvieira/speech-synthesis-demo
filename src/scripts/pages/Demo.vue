<template>
    <div>
        <select v-model="langSelected">
          <option value="" disabled>Please select language</option>
          <option value="en-US">English</option>
          <option value="pt-BR">Portuguese</option>
        </select>

        <ul>
            <li v-for="(question, index) in asks" v-html="question" :key="index"></li>
        </ul>

        <button
            class="btn"
            :disabled="!langSelected || btnDisabled"
            @click="clickHandler">{{ btnText }}</button>
    </div>
</template>

<script>
    /* eslint-disable */
    import { questions, messages, button, time, day } from './../../model.json';

    export default {
        data: function () {
            return {
                btnDisabled: false,
                btnText: 'en-US',
                langSelected: 'en-US',
                recognigation: '',
                asks: ''
            }
        },
        methods: {
            clickHandler() {
                this.btnDisabled = true;
                this.recognigation.start();

                this.recognigation.onresult = (evt) => {
                    const transcript = evt.results[evt.resultIndex][0].transcript;
                    const dt = new Date();

                    if (transcript.toUpperCase().includes(time[this.langSelected].toUpperCase())) {
                        this.speech(dt.toLocaleString(this.langSelected, {
                            hour: '2-digit',
                            minute:'2-digit'
                        }));
                    } else if(transcript.toUpperCase().includes(day[this.langSelected].toUpperCase())) {
                        this.speech(dt.toLocaleString(this.langSelected, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }));
                    } else {
                        this.speech(messages[this.langSelected]);
                    }

                    this.btnDisabled = false;
                }
            },
            speech(message) {
                const utterance = new SpeechSynthesisUtterance(message)
                utterance.lang = this.langSelected;
                utterance.pitch = 1.5;
                utterance.volume = 0.5;
                utterance.rate = 8;
                speechSynthesis.speak(utterance);
            }
        },
        watch: {
            langSelected: function(newV) {
                this.btnText = button[newV];
                this.asks = questions[newV];
                this.recognigation.lang = this.langSelected;
            }
        },
        mounted() {
            this.btnText = button[this.langSelected];
            this.asks = questions[this.langSelected];
            this.recognigation = new webkitSpeechRecognition();
        }
    }
</script>



