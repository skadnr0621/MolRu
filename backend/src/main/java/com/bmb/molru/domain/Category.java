package com.bmb.molru.domain;

public enum Category {
    ANGRY("화남"),
    BRIGHT("밝음"),
    QUITE("차분함"),
    DARK("어두움"),
    EXTREME("극적"),
    FUNKY("펑키"),
    HAPPY("행복"),
    ROMANCE("낭만적"),
    SAD("슬픔");

    private String krEmotion;

    Category(String krEmotion) {
        this.krEmotion = krEmotion;
    }

    public String getKrEmotion() {
        return krEmotion;
    }

    public static Category convert(String category) {
        for (Category value : Category.values()) {
            if(value.getKrEmotion().equals(category)) {
                return value;
            }
        }
        return null;
    }
}
