import { Link } from "react-router";

export default function createAppCard(){
  return {
    id: 'test',
    Component: ()=><article>
      <Link to="/test">To Test</Link>
    </article>,
  }
}