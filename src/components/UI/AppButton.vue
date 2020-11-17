<template>
  <button
    class="btn accent"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"> <slot /> </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style >
.btn {
	display: flex;
	align-items: center;
	color: #fff;
	border: none;
	border-radius: 3px;
	height: 40px;
	cursor: pointer;
	transition: all 150ms ease-out;
}
 .btn:focus {
	outline: none;
}
 .btn:disabled {
	opacity: 0.5;
}
 .btn img {
	width: 28px;
	margin: 0 3px;
	transition: all 150ms ease-out;
}
 .btn span {
	margin: 0 10px;
}
 .accent {
	background-color: rgba(56, 0, 153, 0.45);
}
 .accent:hover:not(:disabled) {
	background-color: #390099;
}
 .danger {
	background-color: rgba(255, 0, 85, 0.45);
}
 .danger:hover:not(:disabled) {
	background-color: #ff0054;
}
 .danger:disabled {
	background-color: rgba(255, 0, 85, 0.45);
}
 .info {
	background-color: rgba(0, 153, 255, 0.45);
}
 .info:hover:not(:disabled) {
	background-color: #09f;
}
 .warning {
	background-color: rgba(255, 187, 0, 0.45);
}
 .warning:hover:not(:disabled) {
	background-color: #ffbd00;
}
 .white {
	background-color: rgba(255, 255, 255, 0.65);
	color: #000;
}
 .white:hover:not(:disabled) {
	background-color: #fff;
}
 .hover {
	position: absolute;
	right: 10px;
	width: 55px;
	height: 50px;
	background-color: rgba(0, 29, 116, 0.25);
	overflow: hidden;
	transition: all 300ms ease-out;
}
 .hover:hover {
	width: 170px;
}
 .hover:hover span {
	text-align: center;
	opacity: 1;
}
 .hover img {
	width: 30px;
	margin: 5px;
}
 .hover span {
	position: absolute;
	opacity: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;
	transition: all 300ms ease-out;
}
 
</style>