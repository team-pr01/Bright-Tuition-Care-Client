import Container from '../../Reusable/Container/Container';
import { ICONS } from '../../../assets';

const Filters = () => {
    return (
        <Container>
            <div className='flex items-center justify-between mt-16'>
                <div className='flex items-center gap-3'>
                    <img src={ICONS.liveJobs} alt="" className='size-8' />
                    <h1 className='text-4xl font-semibold leading-11 text-primary-50'>1024 Live Jobs</h1>
                </div>
                <div className='flex items-center gap-[10px] px-3 py-2 bg-white border border-primary-30 rounded-lg'>
                    <img src={ICONS.filter} alt="" className='size-5' />
                    <h1 className='font-medium leading-6 text-primary-50'>1024 Live Job</h1>
                </div>
            </div>
        </Container>
    );
};

export default Filters;