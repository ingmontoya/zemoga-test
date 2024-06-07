import { defineStore } from 'pinia';
import { computed } from 'vue';
import thumbsUp from '@/assets/img/thumbs-up.svg';
import thumbsDown from '@/assets/img/thumbs-down.svg';
import { useStorage } from "@vueuse/core"

export const useVoteStore = defineStore('voteStore', () => {
  const data = useStorage('voteStoreData', []);
  
  const getWinningIcon = (up, down) => computed(() => up > down ? thumbsUp : thumbsDown).value;
  const getIconBackground = (up, down) => computed(() => up > down ? 'bg-teal-500' : 'bg-yellow-400').value;
  const getText = (item) => computed(() => !item.voted ? `${item.ellapsedTime} ${item.category}` : 'Thank you for your vote').value;

  const handleVote = (item, type) => {
    console.log('handleVote', item, type.vote);
    if (type.vote === 'up') handleVoteUp(item);
    if (type.vote === 'down') handleVoteDown(item);
  };
  
  const handleVoteUp = (item) => {
    item.voted = !item.voted;
    item.votes.up = item.votes.up + 1;
    item.votes.down = item.votes.down - 1;
  };

  const handleVoteDown = (item) => {
    item.voted = !item.voted;
    item.votes.up = item.votes.up - 1;
    item.votes.down = item.votes.down + 1;
  };

  const handleVoteAgain = (item) => {
    item.voted = !item.voted;
  };

  const loadData = () => {
    data.value = [
      {
        id: 1,
        name: 'Kanye West',
        bgCustomGradient: 'bg-custom-gradient-kanye',
        bgCustomBackground: 'bg-custom-kanye',
        description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
        ellapsedTime: '1 month ago in',
        category: 'Entertainment',
        voted: false,
        votes: {
          up: 64,
          down: 36,
        },
      },
      {
        id: 2,
        name: 'Mark Zuckerberg',
        bgCustomGradient: 'bg-custom-gradient-mark',
        bgCustomBackground: 'bg-custom-mark',
        picture: 'mark',
        description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
        ellapsedTime: '24 days ago in',
        category: 'Business',
        voted: true,
        votes: {
          up: 36,
          down: 64,
        },
      },
      {
        id: 3,
        name: 'Cristina Fernández de Kirchner',
        bgCustomGradient: 'bg-custom-gradient-cristina',
        bgCustomBackground: 'bg-custom-cristina',
        description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
        ellapsedTime: '1 year ago in',
        category: 'Politics',
        voted: false,
        votes: {
          up: 45,
          down: 55,
        },
      },
      {
        id: 4,
        name: 'Malala Yousafzai',
        bgCustomGradient: 'bg-custom-gradient-malala',
        bgCustomBackground: 'bg-custom-malala',
        description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
        ellapsedTime: '3 months ago in',
        category: 'Entertainment',
        voted: false,
        votes: {
          up: 62,
          down: 38,
        },
      },
      {
        id: 5,
        name: 'Elon Musk',
        bgCustomGradient: 'bg-custom-gradient-elon',
        bgCustomBackground: 'bg-custom-elon',
        description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
        ellapsedTime: '3 months ago in',
        category: 'Entertainment',
        voted: false,
        votes: {
          up: 62,
          down: 38,
        },
      },
      {
        id: 6,
        name: 'Greta Thunberg',
        bgCustomGradient: 'bg-custom-gradient-greta',
        bgCustomBackground: 'bg-custom-greta',
        description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
        ellapsedTime: '3 months ago in',
        category: 'Entertainment',
        voted: false,
        votes: {
          up: 62,
          down: 38,
        },
      },
    ];
  };

  return { data, getWinningIcon, getIconBackground, getText, handleVote, handleVoteUp, handleVoteDown, handleVoteAgain, loadData };
});
