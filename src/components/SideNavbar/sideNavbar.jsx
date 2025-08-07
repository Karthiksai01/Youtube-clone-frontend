import React from 'react'
import "./sideNavbar.css"
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Link } from 'react-router-dom';


const sideNavbar = ({sideNavbar}) => {
  return (
    <div className= {sideNavbar ?`home-sideNavbar`:"homeSideNavbarHide"}>
        <div className="home_sideNavbarTop">
            <Link to={'/'} className={`home_sideNavbarTopOption`}>
                <HomeIcon/>
                <div className="home_sideNavbarTopOptionTitle">Home</div>
            </Link>
            <div className={`home_sideNavbarTopOption`}>
                <VideocamIcon/>
                <div className="home_sideNavbarTopOptionTitle">Shorts</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <SubscriptionsIcon/>
                <div className="home_sideNavbarTopOptionTitle">Subscription</div>
            </div>
        </div>
        <div className="home-sideNavbarMiddle">
            <div className={`home_sideNavbarTopOption`}>
                <div className="home_sideNavbarTopOptionTitle">You</div>
                <ChevronRightIcon/>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <RecentActorsIcon/>
                <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <HistoryIcon/>
                <div className="home_sideNavbarTopOptionTitle">History</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <PlaylistAddIcon/>
                <div className="home_sideNavbarTopOptionTitle">Playlist</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <SmartDisplayIcon/>
                <div className="home_sideNavbarTopOptionTitle">Your videos</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <WatchLaterIcon/>
                <div className="home_sideNavbarTopOptionTitle">Watch later</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <ThumbUpAltIcon/>
                <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <ContentCutIcon/>
                <div className="home_sideNavbarTopOptionTitle">Your clips</div>
            </div>
        </div>
        <div className="home-sideNavbarMiddle">
            <Link to={'/user/23'} className="home_sideNavbarTopOption">
                <div className="home_subscriptionHeader">Subscription</div>
            </Link>
            <div className={`home_sideNavbarTopOption`}>
                <img className='home_sideNavbar_ImgLogo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_to1asTtxYyJbtVoAx1UgB9ZkcKAXSx9aw&s" alt="" />
                <div className="home_sideNavbarTopOptionTitle">Cool</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <img className='home_sideNavbar_ImgLogo' src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDharmachakra&psig=AOvVaw10-YII-hCO97oKTnPCJ9_d&ust=1751702570947000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCPDdyO3eoo4DFQAAAAAdAAAAABAE" alt="" />
                <div className="home_sideNavbarTopOptionTitle">Dharma</div>
            </div>
            <div className={`home_sideNavbarTopOption`}>
                <img className='home_sideNavbar_ImgLogo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8uSi5n4176w8rSp7LXYawPkG2K4xHOX-mFw&s" alt="" />
                <div className="home_sideNavbarTopOptionTitle">TheoryClub</div>
            </div>

        </div>
    </div>
  )
}

export default sideNavbar
