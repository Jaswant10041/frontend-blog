import useAuth from '../hooks/useAuth'
const Chat=()=>{
    const {authUser}=useAuth();
    console.log(authUser);
    return (<div className='pt-20'>
        Hello
    </div>)
}
export default Chat;