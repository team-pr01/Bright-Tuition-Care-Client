import Container from '../../Reusable/Container/Container';
import JobCard from './JobCard';

const Jobs = () => {
    return (
        <Container>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-9'>
                <JobCard/>
            </div>
        </Container>
    );
};

export default Jobs;