import { useLocation } from 'react-router-dom';

export default function Messages(){
    const location = useLocation();
      const messages = location.state.messages;
    return(
        <>
        <h2>asdsada</h2>
        {messages}
        </>
    )
}