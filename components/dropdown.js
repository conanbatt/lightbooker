import { CSSTransitionGroup } from 'react-transition-group'

const DropdownTransition = (props) => (
  <div>
    <style jsx>{`
      .dropdown-enter {
        max-height: 0px;
        -webkit-transition: max-height 1s ease;
        overflow: hidden;
      }

      .dropdown-enter.dropdown-enter-active {
        height: auto;
        max-height: 500px;
      }

      .dropdown-exit {
        max-height: 500px;
        -webkit-transition: max-height 1s ease;
      }

      .dropdown-exit.dropdown-exit-active {
        overflow: hidden;
        max-height: 0px;
      }
    `}
    </style>
    <CSSTransition
      {...props}
      classNames="dropdown"
      timeout={{ enter: 5000, exit: 3000 }}
    />
  </div>
)

export default ({children})=>(
  <div className="drp">
    <style jsx>{`
      .dropdown-enter {
        max-height: 0px;
        -webkit-transition: max-height 1s ease;
        overflow: hidden;
      }

      .dropdown-enter.dropdown-enter-active {
        height: auto;
        max-height: 500px;
      }

      .dropdown-exit {
        max-height: 500px;
        -webkit-transition: max-height 1s ease;
      }

      .dropdown-exit.dropdown-exit-active {
        overflow: hidden;
        max-height: 0px;
      }
    `}
    </style>
    <CSSTransitionGroup
      transitionAppear={true}>
      <DropdownTransition key={0}>{children}</DropdownTransition>
    </CSSTransitionGroup>
  </div>
)