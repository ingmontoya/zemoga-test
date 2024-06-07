import { ref, onMounted, onBeforeUnmount } from 'vue';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import { debounce } from 'lodash'; 

const fullConfig = resolveConfig(tailwindConfig);

export default function useMobileDetection() {
    const isMobile = ref(false);
    
    const checkMobile = () => {
        isMobile.value = window.innerWidth < Number(fullConfig.theme.screens.sm.replace('px', ''));
    };
    
    onMounted(() => {
        checkMobile();
        window.addEventListener('resize', debounce(checkMobile, 100));
    });
    
    onBeforeUnmount(() => {
        window.removeEventListener('resize', debounce(checkMobile, 100));
    });
    
    return { 
        isMobile 
    };
}
