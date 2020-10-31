import React from 'react';
import PlusPage from '@assets/images/plus-page.svg';

const PagesController = ({ pages, onCreatePage }) => {
  return (
    <div className="pages-controller">
      <div className="pages-blocks">
        {pages.map(({ id, name }) => (
          <div key={id} className="page-block" style={{ background: id === pages[pages.length - 1].id ? '#fff' : '' }}>
            {
              name ? (
                <span className="first">
                  {name}
                </span>
              ) : (
                <span className="first">
                  <br/>
                </span>
              )
            }
            <span className="second">
              (дублирует сверху)
            </span>
          </div>
        ))}
      </div>
      <div onClick={onCreatePage} className="create-page-block">
        <img src={PlusPage} alt="" />
      </div>
    </div>
  );
};

export default PagesController;
