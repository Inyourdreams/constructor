import React, { useState, useEffect } from 'react';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Dropdown from 'rc-dropdown';
import Left from '@assets/images/blocks/Link/left-icon.svg';
import Center from '@assets/images/blocks/Link/centered-icon.svg';
import LeftActive from '@assets/images/blocks/Link/left-icon-active.svg';
import CenterActive from '@assets/images/blocks/Link/centered-icon-active.svg';
import Move from '@assets/images/blocks/move.svg';
import Copy from '@assets/images/blocks/copy.svg';
import Delete from '@assets/images/blocks/delete.svg';
import TextColor from '@assets/images/blocks/Editor/text-color.svg';
import TextColorActive from '@assets/images/blocks/Editor/text-color-active.svg';
import TextItalic from '@assets/images/blocks/Editor/text-italic.svg';
import TextItalicActive from '@assets/images/blocks/Editor/text-italic-active.svg';
import TextBold from '@assets/images/blocks/Editor/text-bold.svg';
import TextBoldActive from '@assets/images/blocks/Editor/text-bold-active.svg';
import Fzplus from '@assets/images/blocks/Editor/fzplus.svg';
import Fzminus from '@assets/images/blocks/Editor/fzminus.svg';
import Bg from '@assets/images/blocks/Editor/bg.svg';
import BgActive from '@assets/images/blocks/Editor/bg-active.svg';
import {convertFromRaw, convertToRaw} from 'draft-js';

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state = this.props.preloadedState && {
      ...this.props.preloadedState,
      editorState: EditorState.createWithContent(convertFromRaw(this.props.preloadedState.rowContent)),
    } || {
      editorState: EditorState.createEmpty(),
      rowContent: null,
      align: 'center',
      backgroundColor: '#fff',
      color: 'darkGrey'
    };
    this.myRef = React.createRef();
    this.blockRef = React.createRef();

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({
        editorState,
        rowContent: convertToRaw(editorState.getCurrentContent()),
      }, () => {
        this.props.onStateChange(this.props.id, {
          rowContent: this.state.rowContent,
          align: this.state.align,
          backgroundColor: this.state.backgroundColor,
          color: this.state.color,
        });
      });
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    this.setState({
      color: toggledColor,
    }, () => {
      this.props.onStateChange(this.props.id, {
        rowContent: this.state.rowContent,
        align: this.state.align,
        backgroundColor: this.state.backgroundColor,
        color: this.state.color,
      });
    });

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const span = this.blockRef.current.querySelector('span[data-text="true"]');
    if (span) {
      span.style.color = (() => {
        if (this.state.color === 'darkGrey') {
          return '#404753';
        } else if (this.state.color === 'darkBlue') {
          return '#113A7B';
        } else if (this.state.color === 'blue') {
          return '#0053D7';
        } else if (this.state.color === 'lightBlue') {
          return '#2C82FF';
        } else if (this.state.color === 'grey') {
          return '#8CA4C0';
        } else if (this.state.color === 'orange') {
          return '#FF8C00';
        } else if (this.state.color === 'red') {
          return '#DC0000';
        } else {
          return '#404753';
        }
      })();
    }
  }

  render() {
    const {editorState} = this.state;
    let editor;
    if (this.myRef.current) {
      editor = this.myRef.current.editor;
      editor.style.backgroundColor = this.state.backgroundColor;
    }

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="block">
        <div className="actions-container">
          <div className="left-side-actions">
            <img
              src={Move}
              alt="move"
            />
          </div>
          <div className="right-side-actions">
            <div className="sub-actions" />
            <div style={{ marginRight: 60 }}>
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <Dropdown
                trigger="click"
                overlay={(
                  <div style={{
                    display: 'flex',
                    borderRadius: 12,
                    padding: '5px 10px',
                    background: '#fff',
                    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
                  }} className="colors">
                    <ColorControls
                      editorState={editorState}
                      onToggle={this.toggleColor}
                    />
                  </div>
                )}
              >
                <div style={{ marginRight: 22 }}>
                  {
                    this.state.color === 'darkGrey' ? (
                      <img src={TextColor} alt=""/>
                    ) : (
                      <img src={TextColorActive} alt=""/>
                    )
                  }
                  <div style={{ height: 20, position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: -5,
                      backgroundColor: (() => {
                      if (this.state.color === 'darkGrey') {
                      return '#404753';
                    } else if (this.state.color === 'darkBlue') {
                      return '#113A7B';
                    } else if (this.state.color === 'blue') {
                      return '#0053D7';
                    } else if (this.state.color === 'lightBlue') {
                      return '#2C82FF';
                    } else if (this.state.color === 'grey') {
                      return '#8CA4C0';
                    } else if (this.state.color === 'orange') {
                      return '#FF8C00';
                    } else if (this.state.color === 'red') {
                      return '#DC0000';
                    } else {
                      return '#404753';
                    }
                    })(),
                      width: 4, height: 4, borderRadius: 2 }} />
                  </div>
                </div>
              </Dropdown>
              <Dropdown
                trigger="click"
                overlay={(
                  <>
                    <div style={{
                      display: 'flex',
                      borderRadius: 12,
                      padding: '5px 10px',
                      background: '#fff',
                      boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
                    }} className="colors">
                      <div onClick={() => {
                        this.setState({
                          backgroundColor: '#fff',
                        }, () => {
                          this.props.onStateChange(this.props.id, {
                            rowContent: this.state.rowContent,
                            align: this.state.align,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.color,
                          });
                        });
                        editor.style.backgroundColor = '#fff';
                      }} style={{ marginRight: 15, height: 14, width: 14, background: '#fff', borderRadius: 10, border: '1px solid #C2CFE0' }} />
                      <div onClick={() => {
                        this.setState({
                          backgroundColor: '#F3F5F9',
                        }, () => {
                          this.props.onStateChange(this.props.id, {
                            rowContent: this.state.rowContent,
                            align: this.state.align,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.color,
                          });
                        });
                        editor.style.backgroundColor = '#F3F5F9';
                      }} style={{ marginRight: 15, height: 14, width: 14, background: '#F3F5F9', borderRadius: 10 }} />
                      <div onClick={() => {
                        this.setState({
                          backgroundColor: '#BFCFE2',
                        }, () => {
                          this.props.onStateChange(this.props.id, {
                            rowContent: this.state.rowContent,
                            align: this.state.align,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.color,
                          });
                        });
                        editor.style.backgroundColor = '#BFCFE2';
                      }} style={{ marginRight: 15, height: 14, width: 14, background: '#BFCFE2', borderRadius: 10 }} />
                      <div onClick={() => {
                        this.setState({
                          backgroundColor: '#CCE1FF',
                        }, () => {
                          this.props.onStateChange(this.props.id, {
                            rowContent: this.state.rowContent,
                            align: this.state.align,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.color,
                          });
                        });
                        editor.style.backgroundColor = '#CCE1FF';
                      }} style={{ marginRight: 15, height: 14, width: 14, background: '#CCE1FF', borderRadius: 10 }} />
                      <div onClick={() => {
                        this.setState({
                          backgroundColor: '#B5D3FF',
                        }, () => {
                          this.props.onStateChange(this.props.id, {
                            rowContent: this.state.rowContent,
                            align: this.state.align,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.color,
                          });
                        });
                        editor.style.backgroundColor = '#B5D3FF';
                      }} style={{ marginRight: 15, height: 14, width: 14, background: '#B5D3FF', borderRadius: 10 }} />
                      <div onClick={() => {
                        this.setState({
                          backgroundColor: '#FFE2C5',
                        }, () => {
                          this.props.onStateChange(this.props.id, {
                            rowContent: this.state.rowContent,
                            align: this.state.align,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.color,
                          });
                        });
                        editor.style.backgroundColor = '#FFE2C5';
                      }} style={{ marginRight: 15, height: 14, width: 14, background: '#FFE2C5', borderRadius: 10 }} />
                      <div onClick={() => {
                        this.setState({
                          backgroundColor: '#FFD70B',
                        }, () => {
                          this.props.onStateChange(this.props.id, {
                            rowContent: this.state.rowContent,
                            align: this.state.align,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.color,
                          });
                        });
                        editor.style.backgroundColor = '#FFD70B';
                      }} style={{ height: 14, width: 14, background: '#FFD70B', borderRadius: 10 }} />
                    </div>
                  </>
                )}
              >
                <div style={{ marginRight: 22 }}>
                  {
                    this.state.backgroundColor === '#fff' ? (
                      <img src={Bg} />
                    ) : (
                      <img src={BgActive} />
                    )
                  }
                  <div style={{ height: 20, position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: -5,
                      backgroundColor: this.state.backgroundColor,
                      width: 5, height: 5, borderRadius: 5,
                      border: '1px solid #F3F5F9'
                    }} />
                  </div>
                </div>
              </Dropdown>
              {
                this.state.align === 'left' ? (
                  <img style={{ marginRight: 22 }} src={LeftActive} onClick={() => {
                    this.setState({
                      align: 'left'
                    }, () => {
                      this.props.onStateChange(this.props.id, {
                        rowContent: this.state.rowContent,
                        align: this.state.align,
                        backgroundColor: this.state.backgroundColor,
                        color: this.state.color,
                      });
                    })
                  }} />
                ) : (
                  <img style={{ marginRight: 22 }} src={Left} onClick={() => {
                    this.setState({
                      align: 'left'
                    }, () => {
                      this.props.onStateChange(this.props.id, {
                        rowContent: this.state.rowContent,
                        align: this.state.align,
                        backgroundColor: this.state.backgroundColor,
                        color: this.state.color,
                      });
                    })
                  }} />
                )
              }
              {
                this.state.align === 'center' ? (
                  <img src={CenterActive} onClick={() => {
                    this.setState({
                      align: 'center'
                    }, () => {
                      this.props.onStateChange(this.props.id, {
                        rowContent: this.state.rowContent,
                        align: this.state.align,
                        backgroundColor: this.state.backgroundColor,
                        color: this.state.color,
                      });
                    })
                  }} />
                ) : (
                  <img src={Center} onClick={() => {
                    this.setState({
                      align: 'center'
                    }, () => {
                      this.props.onStateChange(this.props.id, {
                        rowContent: this.state.rowContent,
                        align: this.state.align,
                        backgroundColor: this.state.backgroundColor,
                        color: this.state.color,
                      });
                    })
                  }} />
                )
              }
            </div>
            <img
              src={Copy}
              onClick={this.props.onClickCopy}
              alt="Copy"
            />
            <img
              src={Delete}
              onClick={this.props.onClickDelete}
              alt="Delete"
            />
          </div>
        </div>
        <div className="content-container">
          <div className="RichEditor-root">
            <div ref={this.blockRef} className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                onTab={this.onTab}
                textAlignment={this.state.align}
                ref={this.myRef}
                spellCheck={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  darkGrey: {
    color: '#404753',
  },
  darkBlue: {
    color: '#113A7B',
  },
  blue: {
    color: '#0053D7',
  },
  lightBlue: {
    color: '#2C82FF',
  },
  grey: {
    color: '#8CA4C0',
  },
  orange: {
    color: '#FF8C00',
  },
  red: {
    color: '#DC0000',
  },
};

var COLORS = [
  {label: <div style={{ height: 14, width: 14, background: '#404753', borderRadius: 10 }} />, style: 'darkGrey'},
  {label: <div style={{ height: 14, width: 14, background: '#113A7B', borderRadius: 10 }} />, style: 'darkBlue'},
  {label: <div style={{ height: 14, width: 14, background: '#0053D7', borderRadius: 10 }} />, style: 'blue'},
  {label: <div style={{ height: 14, width: 14, background: '#2C82FF', borderRadius: 10 }} />, style: 'lightBlue'},
  {label: <div style={{ height: 14, width: 14, background: '#8CA4C0', borderRadius: 10 }} />, style: 'grey'},
  {label: <div style={{ height: 14, width: 14, background: '#FF8C00', borderRadius: 10 }} />, style: 'orange'},
  {label: <div style={{ height: 14, width: 14, background: '#DC0000', borderRadius: 10 }} />, style: 'red'},
];

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {(() => {
          if (this.props.active && this.props.style === 'ITALIC') {
            return <img src={TextItalicActive} />
          } else if (this.props.active && this.props.style === 'BOLD') {
            return <img src={TextBoldActive} alt=""/>
          } else {
            return this.props.label;
          }
        })()}
      </span>
    );
  }
}

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <>
      {COLORS.map(type =>
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </>
  );
};

// This object provides the styling information for our custom color
// styles.
const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  // {label: 'Blockquote', style: 'blockquote'},
  // {label: 'UL', style: 'unordered-list-item'},
  // {label: 'OL', style: 'ordered-list-item'},
  // {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  //onToggle
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 1) {
      props.onToggle('header-three');
    } else if (state === 2) {
      props.onToggle('header-two');
    } else if (state === 3) {
      props.onToggle('header-one');
    }
  }, [state]);


  return (
    // <div className="RichEditor-controls">
    //   {BLOCK_TYPES.map((type) =>
    //     <StyleButton
    //       key={type.label}
    //       active={type.style === blockType}
    //       label={type.label}
    //       onToggle={props.onToggle}
    //       style={type.style}
    //     />
    //   )}
    // </div>
    <div className="RichEditor-controls">
      <img style={{ marginRight: 22 }} src={Fzplus} onClick={(e) => {
        e.preventDefault();
        if (!state) {
          setState(1);
        }
        setState(state < 3 ? state + 1 : state);
      }} />
      <img style={{ marginRight: 22 }} src={Fzminus} onClick={(e) => {
        e.preventDefault();
        if (!state) {
          setState(1);
        }
        setState(state > 1 ? state - 1 : state);
      }} />
    </div>
  );
};

var INLINE_STYLES = [
  {label: <img src={TextBold} />, style: 'BOLD'},
  {label: <img src={TextItalic} />, style: 'ITALIC'},
  // {label: 'Underline', style: 'UNDERLINE'},
  // {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default RichEditorExample;
