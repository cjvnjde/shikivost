import '../assets/main.css';
import { renderAnime } from './anime';
import { renderHeader } from './header';

export function renderContent() {
  renderHeader();
  renderAnime()
}
