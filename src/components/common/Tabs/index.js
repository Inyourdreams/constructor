import React, { useState, useMemo, useCallback } from 'react';

const Tabs = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = useCallback((e) => {
    setCurrentTab(+e.target.getAttribute('data-index'));
  }, [currentTab]);

  const mockTabs = useMemo(() => tabs.map(({ name, index }) => (
    <li
      className={`tab ${currentTab === index ? 'active' : ''}`}
      onClick={handleChangeTab}
      key={index}
    >
      <span data-index={index}>
        {name}
      </span>
      {
        currentTab === index && (
          <div className="tab-indicator" />
        )
      }
    </li>
  )), [currentTab]);

  return (
    <>
      <div className="tabs">
        <ul className="tab-list">
          {mockTabs}
        </ul>
      </div>
      <div className="tab-view">
        {tabs[currentTab].component}
      </div>
    </>
  );
};

export default Tabs;
