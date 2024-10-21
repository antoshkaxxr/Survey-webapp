import {AppRoute} from "../../../const.ts";
import {Link} from "react-router-dom";

export default function PreviewButton({surveyId} : ButtonProps) {
    return (
        <Link to={`${AppRoute.Survey}/${surveyId}`}>
            <button>
                <img src="/icons/icon-preview.svg" alt="Предпросмотр"/>
            </button>
        </Link>
    );
}
