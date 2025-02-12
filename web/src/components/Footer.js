import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFooterHTML, getSystemName } from '../helpers';
import { Layout, Tooltip } from '@douyinfe/semi-ui';

const FooterBar = () => {
  const { t } = useTranslation();
  const systemName = getSystemName();
  const [footer, setFooter] = useState(getFooterHTML());
  let remainCheckTimes = 5;

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  const defaultFooter = (
    <div className='custom-footer'>
      根据
      <a 
        href='https://en.wikipedia.org/wiki/Interim_Measures_for_the_Management_of_Generative_AI_Services'
        target='_blank'
        rel='noreferrer'
      >
      《生成式人工智能服务管理暂行办法》
      </a>
      的要求，请勿对中国地区公众提供一切未经备案的生成式人工智能服务
      
    </div>
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainCheckTimes <= 0) {
        clearInterval(timer);
        return;
      }
      remainCheckTimes--;
      loadFooter();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {footer ? (
        <div
          className='custom-footer'
          dangerouslySetInnerHTML={{ __html: footer }}
        ></div>
      ) : (
        defaultFooter
      )}
    </div>
  );
};

export default FooterBar;
