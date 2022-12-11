import PATH from "./contants/path";
import Image from "./feature/User/pages/Image";
import ImageDetail from "./feature/User/pages/Image/ImageDetail";
import Profile from "./feature/User/pages/Profile";
import Video from "./feature/User/pages/Video";
import VideoDetail from "./feature/User/pages/Video/videoDetail";

const router = [
    {
        path: PATH.INFO,
        component: Profile,
    },
    {
        path: PATH.IMAGE.BASE,
        component: Image,
    },
    {
        path: PATH.IMAGE.EDIT_IMAGE,
        component: ImageDetail,
    },
    {
        path: PATH.VIDEO.BASE,
        component: Video,
    },
    {
        path: PATH.VIDEO.EDIT_VIDEO,
        component: VideoDetail,
    },
]


export default router;