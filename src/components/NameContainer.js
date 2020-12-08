import Name from './Name';

const NameContainer = ({ names }) => (
    <div>{names.map(name => <Name name={name}  key={name.id}/>)}</div>
);

export default NameContainer;