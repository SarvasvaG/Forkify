import { mark } from 'regenerator-runtime';
import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage =
    'No bookmarks yet. Please find a nice recipe and bookmark it!';
}

export default new BookmarksView();
