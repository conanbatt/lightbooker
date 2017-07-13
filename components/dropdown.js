import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const Dropdown = ({children})=>{
  <ReactCSSTransitionGroup
    transitionName="dropdown"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}
  >
  <style jsx>{`
    .dropdown-enter {
      max-height: 0px;
      -webkit-transition: max-height 1s ease;
      overflow: hidden;
    }

    .dropdown-enter.dropdown-enter-active {
      height: auto;
      max-height: 100px;
    }

    .dropdown-leave {
      max-height: 100px;
      -webkit-transition: max-height 1s ease;
    }

    .dropdown-leave.dropdown-leave-active {
      overflow: hidden;
      max-height: 0px;
    }
  `}
    {children}
  </ReactCSSTransitionGroup>
}