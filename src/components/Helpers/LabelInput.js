import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Label, Input, FormFeedback, FormText, FormGroup } from 'reactstrap';
import { SetValue2, ValidateInput } from 'store/actions/helpers/displayAction.js';
import { GetDate } from 'store/actions/helpers/dateAction.js';

const LabelInput = (props) => {

  // for input validation
  var isValid = (props.validate && props.value && props.value != "N/A")
    ? props.ValidateInput(props.value, props.validate.type)
    : true;

  return (
    <div className={"form-group label-input " + ((props.hasOwnProperty("className")) ? props.className : "")} id={(props.wna) ? "withNA" : ""}>

      {(props.label)
        ? <MyLabel props={props} />
        : ""}

      {(props.wna)
        ? <CheckBox props={props} />
        : ""}

      {(props.type != "select")
        ? <MyInput props={props} isValid={isValid} />
        : <MySelect props={props} />}

      {(props.labelBottom)
        ? <span className="label-bottom">{props.labelBottom}</span>
        : ""}

      {(!isValid && props.validate && props.validate.wMsg && props.value && props.value != "N/A")
        ? <InptMsg props={props} />
        : ""}

    </div>
  );
}

const CheckBox = (props) => {
  props = props.props;
  return (
    <span id="checkbox">
      <Label>
        <input type="checkbox" onClick={(e) => {
          props.SetValue2(props.prop, (e.target.checked) ? "N/A" : "", props.reducer);
        }} />
        N/A
      </Label>
    </span>
  );
}

const MyLabel = (props) => {
  props = props.props;
  return (
    <Label className="form-control-label">
      {props.label}
      {(props.req)
        ? <span className="astrsk"> *</span>
        : ""}
    </Label>
  )
}

const MyInput = (props) => {
  var isValid = props.isValid;
  props = props.props;

  return (
    <Fragment>
      <Input
        style={props.style || {}}
        spellCheck="false"
        className={(props.className || "editable") + " form-control-alternative"}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        onKeyUp={props.onKeyUp}
        onKeyDown={props.onKeyDown}
        value={(props.type == "date") ? props.GetDate(new Date(props.value)) : props.value}
        disabled={((props.value === "N/A" && props.hasOwnProperty("wna") && props.wna == true) || props.disabled) ? true : false}
        data-case={props.case}
        data-type={props.dtype}
        data-prop={props.prop}
        type={props.type}
        id={(isValid) ? "" : "inpt-invalid"}
        invalid={(!isValid && (props.value && props.value != "N/A")) ? true : false}
      />
    </Fragment>
  );
}

const MySelect = (props) => {
  props = props.props;
  return (
    <select
      className="form-control-alternative form-control"
      onChange={props.onChange}
      value={props.value}
      data-prop={props.prop}
      type={props.type}
      disabled={(props.value === "N/A" || props.disabled) ? true : false}>

      {
        props.options.map(({ value, text }, i) => {
          return (props.value != "N/A" && value != "N/A")
            ? <option value={value} key={"li-myselect-" + i}>{text}</option>
            : ""
        })
      }

    </select>
  );
}

const InptMsg = (props) => {
  var isValid = props.isValid;
  props = props.props;
  return (
    <div id="inpt-msg">
      <em id={(isValid && props.value != "N/A") ? "valid" : "invalid"}>
        Invalid Input for {props.validate.type}
      </em>
    </div>
  )
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
  SetValue2,
  GetDate,
  ValidateInput
})(LabelInput);
