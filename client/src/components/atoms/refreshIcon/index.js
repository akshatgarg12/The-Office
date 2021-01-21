import {Icon} from 'semantic-ui-react'
const RefreshIcon = ({refetch}) => {
  return (
    <div onClick={() => refetch()} style={{cursor:"pointer", display:"inline"}}>
      <Icon name="refresh" color="grey" />
      Refresh
    </div>
  );
}
 
export default RefreshIcon;