import { useLocation, Outlet } from 'react-router-dom';
import VideosDuMoment from '../components/hero/VideosDuMoment';
import ArticleDeLaSaison from '../components/hero/ArticleDeLaSaison';
import { TraitementImage } from '../components/hero/TraitementImage';

export function Layout() {
    const location = useLocation();
    const keepAlivePaths =
        ['/videos-du-moment', '/article-de-la-saison', '/traitement'].includes(location.pathname)

    return (
        <>
            <div style={{ display: location.pathname === '/videos-du-moment' ? 'block' : 'none' }}>
                <VideosDuMoment />
            </div>
            <div
                style={{
                    display: location.pathname === '/article-de-la-saison' ? 'block' : 'none',
                }}
            >
                <ArticleDeLaSaison />
            </div>
            <div
                style={{
                    display: location.pathname === '/traitement' ? 'block' : 'none',
                }}
            >
                <TraitementImage />
            </div>

            {!keepAlivePaths && <Outlet />}
        </>
    );
}
