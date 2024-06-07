<script setup>
import { computed, onMounted, ref } from 'vue';
import { useVoteStore } from '@/stores/useVoteStore';
import { useCustomSelectStore } from '@/stores/useCustomSelectStore';
import useMobileDetection  from '@/composables/useMobileDetection';

const voteStore = useVoteStore();
const customSelectStore = useCustomSelectStore();
const { isMobile } = useMobileDetection();
const selectedVotesUp = ref([]);
const selectedVotesDown = ref([]);

onMounted(() => {
    if (!voteStore.data.length) {
        voteStore.loadData();
    }
})

const ListView = computed(() => customSelectStore.selected === 'List');
const nameLength = (item) => item.name.length > 16;

const handleSelectedVote = (vote, item) => {
    if(vote === 'up'){
        selectedVotesUp.value[item.id] = true;
        selectedVotesDown.value[item.id] = false;
        
    } else if(vote === 'down') {
        selectedVotesUp.value[item.id] = false;
        selectedVotesDown.value[item.id] = true;
    }else {
        selectedVotesUp.value[item.id] = false;
        selectedVotesDown.value[item.id] = false;
        voteStore.handleVoteAgain(item);
    }
}
const handleVoteAgain = (item) => {
    item.voted = !item.voted;
  };

</script>

<template>
    <div v-if="ListView && !isMobile" class="flex gap-3 mt-4 flex-col">
        <aside 
            v-for="(item, index) in voteStore.data" :key="item.id"
            class="relative flex flex-col bg-contain bg-no-repeat w-full" :class='[item.bgCustomGradient]' role="doc-tip" aria-label="card vote"
        >
                <div class="">
                    <button class="border-0 p-3 absolute top-0 left-0" :class="voteStore.getIconBackground(item.votes.up, item.votes.down)">
                        <img :src="voteStore.getWinningIcon(item.votes.up, item.votes.down)"/>
                    </button>   
                    <div class="mr-3 absolute top-0 right-0">
                        <p class="text-white text-xs">  {{ voteStore.getText(item) }}</p>
                    </div> 
                </div>
                <div class="px-3 ">
                    <div class="flex flex-row justify-between items-center">
                        <div class="w-56">

                        </div>
                        <div class="flex flex-col w-96">
                            <h1 class="text-white font-normal"> {{ item.name }} </h1>
                            <p class="text-white text-wrap font-normal mt-0"> {{ item.description }}</p>
                        </div>

                        <div class="flex flex-row gap-4 items-center justify-center w-96">
                            <div class="w-24">
                                <div v-if="!item.voted" class="flex flex-row gap-4 transition-all duration-300">
                                <button @click="handleSelectedVote('up', item)"  class="bg-teal-500 p-3 border-solid border-transparent transition-all duration-300  hover:cursor-pointer" :class="selectedVotesUp[item.id] ? 'border-white' : ''" aria-label="thumbs up">
                                    <img src="@/assets/img/thumbs-up.svg " alt="thumbs up" />
                                </button> 
                                <button @click="handleSelectedVote('down', item)" class="bg-yellow-400 p-3 border-solid border-transparent transition-all duration-300 hover:border-white hover:cursor-pointer" :class=" selectedVotesDown[item.id]  ? 'border-white' : ''" aria-label="thumbs down">
                                    <img src="@/assets/img/thumbs-down.svg " alt="thumbs down" />
                                </button> 
                            </div>
                            </div>
                            <div class="w-24">
                                <button  @click="(selectedVotesUp[item.id] || selectedVotesDown[item.id]) ? voteStore.handleVote(item, selectedVotesUp[item.id] ? {vote: 'up'} : {vote: 'down'}) : ''" class="w-32 p-3 text-center border border-solid text-xl transition-all duration-300 hover:bg-white hover:text-black hover:border-black hover:cursor-pointer text-white bg-black bg-opacity-60"  aria-label="vote">
                            {{ item.voted ? 'Vote again' : 'Vote now' }}
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row">
                    <button class="px-5 flex flex-row items-center gap-2 bg-teal-500 border-0 bg-opacity-50" :style="`width:${item.votes.up}%`" aria-label="thumbs up">
                            <img class="w-4 h-4" src="@/assets/img/thumbs-up.svg " alt="thumbs up" /><h3 class="text-white m-0 text-xl">{{ item.votes.up }}%</h3>
                        </button> 
                    <button class="px-5 flex flex-row items-center justify-end gap-2 bg-yellow-400 p-3 border-0 bg-opacity-50" :style="`width:${item.votes.down}%`" aria-label="thumbs down">
                        <h3 class="text-white m-0 text-xl">{{ item.votes.down }}%</h3><img class="w-4 h-4" src="@/assets/img/thumbs-down.svg " alt="thumbs down" />
                    </button> 
                </div>
        </aside>   
    </div>
    <div v-else class="flex flex-row mt-4 gap-2"
    :class="isMobile ? 'flex-nowrap overflow-x-auto overflow-visible': 'grid grid-cols-2 lg:grid-cols-3'"
    >
        <aside 
            v-for="item in voteStore.data" :key="item.id"
            class="flex flex-col bg-cover bg-no-repeat bg-top" 
            :class="[item.bgCustomBackground, isMobile ? ' min-w-96 min-h-70' : ' ']" role="doc-tip" aria-label="card vote"
        >
                <div class="">
                    <div class="flex flex-row justify-between items-center">
                        <div class="">

                        </div>
                        <div class="flex flex-col" :class="nameLength(item) ? 'mt-4' : 'mt-12'">
                            <div>
                                <div class="flex items-end">
                                    <button class="border-0 p-2 mr-2" :class="voteStore.getIconBackground(item.votes.up, item.votes.down)">
                                        <img :src="voteStore.getWinningIcon(item.votes.up, item.votes.down)"/>
                                    </button>  
                                    <h1 class="text-white font-normal m-0 text-3xl " :class=" {'line-clamp-2 w-52' : nameLength(item)}"> {{ item.name }}  </h1>
                                </div>
                            </div>
                            
                            <p class="text-white text-wrap text-sm m-0 p-4"> {{ item.description }}</p>
                            <div class="flex flex-col items-end mr-8">
                                <p class="text-white text-xs mb-2">  {{ voteStore.getText(item) }}</p>
                                <div  class="flex flex-row gap-2 mb-3">
                                    <button v-if="!item.voted" @click="voteStore.handleVoteUp(item)"  class="bg-teal-500 w-8 h-8 border-solid border-transparent transition-all duration-300 hover:border-white hover:cursor-pointer" aria-label="thumbs up">
                                        <img src="@/assets/img/thumbs-up.svg " alt="thumbs up" />
                                    </button> 
                                    <button v-if="!item.voted" @click="voteStore.handleVoteDown(item)" class="bg-yellow-400 w-8 h-8 border-solid border-transparent transition-all duration-300 hover:border-white hover:cursor-pointer" aria-label="thumbs down">
                                        <img src="@/assets/img/thumbs-down.svg " alt="thumbs down" />
                                    </button> 
                                    <button  :class="{'hover:cursor-not-allowed': item.voted}" @click="handleVoteAgain(item)" class="w-17 h-8 text-center border border-solid border-white text-sm transition-all duration-300 hover:bg-white hover:text-black hover:border-black hover:cursor-pointer text-white bg-black bg-opacity-60" aria-label="vote">
                                        {{ item.voted ? 'Vote again' : 'Vote now' }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="hidden flex-row gap-4 items-center justify-center">
                            <div class="">
                                <div v-if="!item.voted" class="flex flex-row gap-4 transition-all duration-300">
                                <button @click="voteStore.handleVoteUp(item)"  class="bg-teal-500 p-3 border-solid border-transparent transition-all duration-300 hover:border-white hover:cursor-pointer" aria-label="thumbs up">
                                    <img src="@/assets/img/thumbs-up.svg " alt="thumbs up" />
                                </button> 
                                <button @click="voteStore.handleVoteDown(item)" class="bg-yellow-400 p-3 border-solid border-transparent transition-all duration-300 hover:border-white hover:cursor-pointer" aria-label="thumbs down">
                                    <img src="@/assets/img/thumbs-down.svg " alt="thumbs down" />
                                </button> 
                            </div>
                            </div>
                            
                            <div class="">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row">
                    <button class="px-5 flex flex-row items-center gap-2 bg-teal-500 border-0 bg-opacity-50" :style="`width:${item.votes.up}%`" aria-label="thumbs up">
                            <img class="w-4 h-4" src="@/assets/img/thumbs-up.svg " alt="thumbs up" /><h3 class="text-white m-0 text-xl">{{ item.votes.up }}%</h3>
                        </button> 
                    <button class="px-5 flex flex-row items-center justify-end gap-2 bg-yellow-400 p-3 border-0 bg-opacity-50" :style="`width:${item.votes.down}%`" aria-label="thumbs down">
                        <h3 class="text-white m-0 text-xl">{{ item.votes.down }}%</h3><img class="w-4 h-4" src="@/assets/img/thumbs-down.svg " alt="thumbs down" />
                    </button> 
                </div>
        </aside>   
    </div>
</template>
<style lang="scss" scoped></style>
