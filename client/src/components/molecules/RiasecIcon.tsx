import Social from '@/assets/svg/social.svg';
import Enterprising from '@/assets/svg/enterprising.svg';
import Conventional from '@/assets/svg/conventional.svg';
import Realistic from '@/assets/svg/realistic.svg';
import Artistic from '@/assets/svg/artistic.svg';


const icons = {
    Social,
    Enterprising,
    Conventional,
    Realistic,
    Artistic
}

const RiasecIcon = ({riasec}: {riasec: string}) => {
    console.log('riasec', riasec)
    console.log('icons[riasec]', icons[riasec])
    return riasec && icons[riasec] ? <Image src={icons[riasec]} /> : null
}

export default RiasecIcon;
