import moment from 'moment';
const TimeComponent = ({ time }) => {
    return moment.unix(time/1000).fromNow();
}

export default TimeComponent;