<template>
    <card-case
        v-if="stampCardsPercentage"
        :card="card"
        :data-test-id="testId"
        :class="[$style['c-stampCard1']]">
        <div :class="[$style['c-stampCard1-headerDetails']]">
            <img
                :class="[$style['c-stampCard1-icon']]"
                :data-test-id="testIdForSection('image')"
                :src="card.image"
                :alt="card.title">
            <h3
                v-make-text-accessible
                :class="[$style['c-stampCard1-title']]"
                :data-test-id="testIdForSection('title')">
                {{ card.title }}
            </h3>

            <p
                v-make-text-accessible
                :class="[$style['c-stampCard1-statusText']]"
                :data-test-id="testIdForSection('statusText')"
            >
                {{ card.subtitle }}
            </p>
        </div>
        <div
            v-if="isReadyToClaim"
            :class="[
                $style['c-stampCard1-redemptionDetails']
            ]"
            :data-test-id="testIdForSection('redemptionDetails')">
            <div
                v-for="(subStatusLine, index) in card.description"
                :key="index"
                v-make-text-accessible
                :class="[$style['c-stampCard1-subStatusText']]"
                :data-test-id="testIdForSection('subStatusText', index)">
                {{ subStatusLine }}
            </div>
            <div
                :class="[$style['c-stampCard1-expiryInfo']]"
                :data-test-id="testIdForSection('expiryInfo')">
                {{ card.expiryLine }}
                <template v-if="hasValidExpiryDate">
                    <span :aria-label="expiryDateAccessible">
                        <span aria-hidden="true">{{ expiryDateVisual }}</span>
                    </span>
                </template>
            </div>
        </div>
        <div
            v-else
            :class="[$style['c-stampCard1-stamps']]"
            :data-test-id="testIdForSection('stamps')"
            role="img"
            :aria-label="stampCardsStatusCopy">
            <div
                v-for="({ stampImage, classSuffix }, index) in stamps"
                :key="index">
                <div
                    :class="[$style[`c-stampCard1-stamp`]]"
                    :data-test-id="testIdForSection(`stamp${classSuffix}`)">
                    <component
                        :is="stampImage"
                        :class="[
                            $style[`c-stampCard1-stampImage`],
                            $style[`c-stampCard1-stamp${classSuffix}`]
                        ]"
                    />
                </div>
            </div>
        </div>
    </card-case>
</template>

<script>
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import lightFormat from 'date-fns/lightFormat';
import {
    da, enAU, enNZ, enGB, es, it, nb
} from 'date-fns/locale';
import EmptyStamp15 from './images/stamp-empty-15.svg';
import FullStamp15 from './images/stamp-full-15.svg';
import EmptyStamp10 from './images/stamp-empty-10.svg';
import FullStamp10 from './images/stamp-full-10.svg';

import CardCase from './CardCase.vue';

import makeTextAccessible from '../MakeTextAccessible';

const PERMITTED_STAMPCARDS_PERCENTAGES = [
    '10',
    '15'
];

export default {
    name: 'StampCard1',

    components: {
        EmptyStamp15,
        FullStamp15,
        EmptyStamp10,
        FullStamp10,
        CardCase
    },

    directives: {
        makeTextAccessible
    },

    inject: [
        'copy'
    ],

    props: {
        card: {
            type: Object,
            required: true
        },

        testId: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            // Here for reference, TBC by product - currently this.card.totalRequiredStamps is provided but we have no
            // way of catering for any amount other than 5 when passed as part of the card data
            totalRequiredStamps: 5,
            dateFnsLocale: undefined
        };
    },

    computed: {
        /**
         * Converts the string value from the card data into a `Date`
         * @return {Date | *}
         */
        expiryDate () {
            return parseISO(this.card.expiryDate);
        },

        /**
         * Gives the date in two-digit Day/Month format eg "16/12"
         * @return {string}
         */
        expiryDateVisual () {
            return lightFormat(this.expiryDate, 'dd/MM');
        },

        /**
         * Gives the date in localised long-form for screenreaders - e.g. "December 16th"
         * @return {string}
         */
        expiryDateAccessible () {
            return format(this.expiryDate, 'LLLL do', { locale: this.dateFnsLocale });
        },

        /**
         * Truthy when the Date value given by expiryDate has parsed correctly
         * @return {boolean}
         */
        hasValidExpiryDate () {
            return !Number.isNaN(this.expiryDate.valueOf());
        },

        /**
         * Allows the card to interpret both `true` and the string value `"true"` as meaning ready to claim
         * @return {boolean}
         */
        isReadyToClaim () {
            return [true, 'true'].includes(this.card.isReadyToClaim);
        },

        /**
         * Gives an array of stamp objects that the component can scaffold into components for display
         * @return {Object[]}
         */
        stamps () {
            const stamps = [];

            for (let i = 0; i < this.card.totalRequiredStamps; i++) {
                const full = (i < this.card.earnedStamps);
                stamps.push(full ? {
                    stampImage: `FullStamp${this.stampCardsPercentage}`,
                    classSuffix: 'Full'
                } : {
                    stampImage: `EmptyStamp${this.stampCardsPercentage}`,
                    classSuffix: 'Empty'
                });
            }

            return stamps;
        },

        /**
         */
        stampCardsPercentage () {
            if (PERMITTED_STAMPCARDS_PERCENTAGES.includes(this.card.discountPercentage)) {
                return this.card.discountPercentage;
            }

            if (PERMITTED_STAMPCARDS_PERCENTAGES.includes(this.copy.stampCardDefaultPercentage)) {
                return this.copy.stampCardDefaultPercentage;
            }

            return null;
        },

        /**
         * Returns the stamp card status text based on the number of completed steps for accessibility
         * @return String
         */
        stampCardsStatusCopy () {
            return this.copy.stampCardStatus[this.card.earnedStamps];
        },

        /**
         * Creates a function that gives portions of the component's markup unique testIds for unit and browser testing
         * @return {function(*, *=): string|boolean}
         */
        testIdForSection () {
            return (section, index) => (this.testId
                ? `${this.testId}--${section}${index === undefined ? '' : `--${index}`}`
                : false);
        }

    },

    mounted () {
        this.dateFnsLocale = this.getDateFnsLocale(this.copy.locale);
    },

    methods: {
        /**
         * Takes the locale and lazyloads the correct date locale from the date-fns library
         * @param locale
         * @returns {
         *  da |
         *  enAU |
         *  enGB |
         *  enNZ |
         *  es |
         *  it |
         *  nb
         * }
         */
        getDateFnsLocale (locale) {
            switch (locale) {
                case 'da-DK':
                    return da;
                case 'en-AU':
                    return enAU;
                case 'en-NZ':
                    return enNZ;
                case 'es-ES':
                    return es;
                case 'it-IT':
                    return it;
                case 'nb-NO':
                    return nb;
                case 'en-GB':
                case 'en-IE':
                default:
                    return enGB;
            }
        }
    }
};
</script>

<style lang="scss" module>
$stampCard-subStatus-colour: $color-support-positive;
$stampCard-expiryInfo-colour: $color-content-subdued;

$stampCard-iconSize-landscape: 56px;
$stampCard-iconSize-portrait: 48px;

$stampCard-responsive-mobileViewBreakpoint: '<=narrowMid';
$stampCard-responsive-tabletViewBreakpoint: '<=mid';

.c-stampCard1 {
    text-decoration: initial;
    max-width: 392px;
    display: flex;
    flex-direction: column;
    padding: spacing(d);
    border-radius: $radius-rounded-c;
    box-shadow: $elevation-01;

    &,
    &:hover,
    &:visited,
    &:focus {
        color: $color-content-default;
    }

    @include media($stampCard-responsive-tabletViewBreakpoint) {
        max-width: 344px;
    }

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        width: auto;
        max-width: none;
    }
}

.c-stampCard1-headerDetails {
    margin-bottom: spacing();
}

.c-stampCard1-icon {
    float: left;
    margin-right: spacing(d);
    margin-bottom: spacing();
    width: $stampCard-iconSize-landscape;
    height: $stampCard-iconSize-landscape;
    border-radius: $radius-rounded-c;

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        width: $stampCard-iconSize-portrait;
        height: $stampCard-iconSize-portrait;
    }
}

.c-stampCard1-title {
    margin-top: 0;
    margin-bottom: spacing(a);

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        @include font-size(heading-s, true, narrow);
    }
}

.c-stampCard1-statusText {
    margin: spacing(a) spacing(d) 0 spacing(d);
}

.c-stampCard1-subStatusText {
    color: $stampCard-subStatus-colour;
    margin-bottom: spacing();
}

.c-stampCard1-expiryInfo {
    color: $stampCard-expiryInfo-colour;
}

.c-stampCard1-stamps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 10px;

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        padding-top: 0;
    }
}

.c-stampCard1-stamp {
    position: relative;
    height: 0;
    width: 45px;
    padding: 0 0 100%;

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        width: 40px;
    }
}

.c-stampCard1-stampImage {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    &#{&} { // to increase specificity level to override svg:not(:root) rule
        overflow: visible;
    }
}
</style>
