import { useContext } from "react";
import { Context } from "../../context/context";
import "./sidebar.css";

const Sidebar = () => {

    const{loading, resultData, } = useContext(Context);
    return (
        <div>
            <div className="result">
                <div className="result-data">
                    {loading ?
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :
                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Sidebar;